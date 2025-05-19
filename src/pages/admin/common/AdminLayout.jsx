import AuthLayout from '@/pages/common/AuthLayout';
import React from 'react'
import SideBar from './Sidebar';

export default function AdminLayout({ children, page }) {
    return (
        <AuthLayout sidebar={<SideBar/>} page={page}>
          {children}
        </AuthLayout>
      ); 
}
