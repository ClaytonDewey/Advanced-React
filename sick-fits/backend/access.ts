import { permissionsList } from './schemas/fields';
import { ListAccessArgs } from './types';
// At its simplest, the access control returns a yes or no value depending on the user's session

export function isSignedIn({ session }: ListAccessArgs) {
  return !!session;
}

const generatedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function ({ session }: ListAccessArgs) {
      return !!session?.data.role?.[permission];
    },
  ]),
);

// Permissions check if someone meeta a criteria - yes or no
export const permissions = {
  ...generatedPermissions,
  isAwesome({ session }: ListAccessArgs) {
    return session?.data.name.includes('clay');
  },
};

// Rule based function
