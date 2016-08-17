// sign in:

module.exports = {
    'POST /signin': async (ctx, next) => {
        var
            email = ctx.request.body.email || '',
            password = ctx.request.body.password || '';
        if (email === 'admin@example.com' && password === '123456') {
            console.log('signin ok!');
            ctx.render('signin-ok.html', {
                name: 'Mr Node',
                last: new Date(),
            });
        } else {
            console.log('signin failed!');
            ctx.render('signin-failed.html');
        }
    }
};
