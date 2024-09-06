import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { Profile } from "../../profile-manager";
import { useEffect, useState } from "react";

interface IconSelectorHeaderProps {
  profile: Profile; 
}

const IconSelectorHeader: React.FC<IconSelectorHeaderProps> = ({profile}) => {
  // const [Newprofile, setProfile] = useState();
  const {user} = useSelector((state: RootState) => state.auth);
 console.log(user)

 return(
 <div className="flex justify-between items-center">
    <div className="flex items-center">

      <div>
        <h1 className="text-2xl font-bold mb-1 ">Edit Profile</h1>
        <p className="text-sm text-gray-400 mb-8">Choose a profile icon.</p>
      </div>
    </div>
    <div className="flex items-center">
      <span className="mr-2">{profile.name}</span>
      <img
        src={user?.avatar || profile.src}
        alt="Current profile"
        className="w-10 h-10 rounded"
      />
    </div>
  </div>
 );
};

export default IconSelectorHeader;
