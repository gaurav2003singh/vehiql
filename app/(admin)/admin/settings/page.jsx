import React from 'react'
import SettingsForm from './.components/settings-form'
export const metadata = {
    title: "Settings",
    description: "Manage dealership working hours and admin users",
}

const Settingspage = () => {
  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-6'>Settings</h1>
        <SettingsForm />
    </div>
  )
}

export default Settingspage;

