import React from 'react';
import './profile.scss';
import NavigationMenuComponent from '../../components/NavigationMenuComponent';

function ProfileView() {

  return (
    <div className="profile-view">

        <NavigationMenuComponent />
        <h1>Profile</h1>
    </div>
  );
}

export default ProfileView;