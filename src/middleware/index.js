import { parse } from 'cookie';

const authMiddleware = (handler) => {
    return async (context) => {
        const { req, res } = context;

        const cookies = parse(req.headers.cookie || '');

        if (req.url === '/admin/auth') {
            if (cookies['token']) {
                res.writeHead(302, { Location: '/admin/dashboard/profile/' });
                res.end();
                return { props: {} };
            }
        } else if (req.url === '/admin/dashboard/') {
            if (!cookies['token']) {
                res.writeHead(302, { Location: '/admin/auth/' });
                res.end();
                return { props: {} };
            }
        }

        if (req.url === '/admin/dashboard/profile/') {
            if (!cookies['token']) {
                res.writeHead(302, { Location: '/admin/auth/' });
                res.end();
                return { props: {} };
            }
        }

        if (req.url === '/admin/dashboard/user/') {
            if (!cookies['token']) {
                res.writeHead(302, { Location: '/admin/auth/' });
                res.end();
                return { props: {} };
            }
        }

        if (req.url === '/admin/dashboard/project/') {
            if (!cookies['token']) {
                res.writeHead(302, { Location: '/admin/auth/' });
                res.end();
                return { props: {} };
            }
        }

        if (req.url === '/admin/dashboard/team/') {
            if (!cookies['token']) {
                res.writeHead(302, { Location: '/admin/auth/' });
                res.end();
                return { props: {} };
            }
        }

        if (req.url === '/user/auth/') {
            if (!cookies['employeetoken']) {
                res.writeHead(302, { Location: '/user/auth/' });
                res.end();
                return { props: {} };
            } else if (cookies['employeetoken']) {
                res.writeHead(302, { Location: '/user/dashboard/' });
                res.end();
                return { props: {} };
            }
        }

        if (req.url === '/user/dashboard/') {
            if (!cookies['employeetoken']) {
                res.writeHead(302, { Location: '/user/auth/' });
                res.end();
                return { props: {} };
            }
        }

        if (req.url === '/user/dashboard/profile/') {
            if (!cookies['employeetoken']) {
                res.writeHead(302, { Location: '/user/auth/' });
                res.end();
                return { props: {} };
            }
        }

        return await handler(context);
    };
};

export default authMiddleware;