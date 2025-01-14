import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { getCurrentUser } from '../services/userService';
import authService from '../services/authService';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userState, setUserState] = useState(() => {
        // Khởi tạo state từ localStorage
        const savedUser = authService.getCurrentUser();
        return {
            user: savedUser,
            avatar: savedUser?.avatar || null,
            loading: !savedUser,
            version: 0
        };
    });

    const updateUserState = useCallback((newData) => {
        setUserState(prev => ({
            ...prev,
            ...newData,
            version: prev.version + 1
        }));
    }, []);

    const updateAvatar = useCallback((newAvatar) => {
        setUserState(prev => ({
            ...prev,
            avatar: newAvatar,
            version: prev.version + 1
        }));
    }, []);

    const updateUser = useCallback((newUserData) => {
        // Xử lý avatar URL trước khi cập nhật
        const processedUser = authService.processUserData(newUserData);
        
        // Lưu vào localStorage
        localStorage.setItem('user', JSON.stringify(processedUser));
        
        setUserState(prev => ({
            ...prev,
            user: processedUser,
            avatar: processedUser.avatar,
            version: prev.version + 1
        }));
    }, []);

    const fetchUser = useCallback(async () => {
        if (!authService.isAuthenticated()) {
            setUserState(prev => ({ ...prev, loading: false }));
            return;
        }

        try {
            const userData = await getCurrentUser();
            // Xử lý avatar URL trước khi cập nhật
            const processedUser = authService.processUserData(userData);
            
            setUserState(prev => ({
                ...prev,
                user: processedUser,
                avatar: processedUser.avatar,
                loading: false,
                version: prev.version + 1
            }));
        } catch (error) {
            console.error('Error fetching user:', error);
            setUserState(prev => ({
                ...prev,
                loading: false
            }));
        }
    }, []);

    // Fetch user khi component mount hoặc token thay đổi
    useEffect(() => {
        if (authService.isAuthenticated()) {
            fetchUser();
        }
    }, [fetchUser]);

    const contextValue = {
        user: userState.user,
        avatar: userState.avatar,
        loading: userState.loading,
        version: userState.version,
        updateUser,
        updateAvatar,
        refetchUser: fetchUser
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
