import { MainLayout } from "../../../components/Layout/MainLayout";
import { useAuth } from "../../../lib/auth";

import { UserProfileForm } from "../components/UserProfileForm";
import { User } from "../types";

export const UserProfile = () => {
    const { user } = useAuth();

    if (!user) {
        return null;
    }

    return (
        //<MainLayout>
            <UserProfileForm user={user as User} />
        //</MainLayout>
    );
}