import AuthLayout from '@/pages/common/AuthLayout';
import React from 'react'
import SideBar from './Sidebar';

export default function TeacherLayout({ children, page }) {
    return (
        <AuthLayout sidebar={(user) => <SideBar user={user} />} page={page}>
          {children}
        </AuthLayout>
      );
}
