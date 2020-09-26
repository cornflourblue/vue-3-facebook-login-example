import { accountService } from '@/_services';
import { router } from '@/_helpers';

export function authGuard(to) {
    const account = accountService.accountValue;
    if (account) {
        // logged in so return true
        return true;
    }

    // not logged in so redirect to login page with the return url
    router.push({ path: '/login', query: { returnUrl: to.fullPath } });
    return false;
}