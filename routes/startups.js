// var session=require('../libs/mongoose');
// const send = require('koa-send');
// const passport = require('koa-passport');
// const mongoose=require('../libs/mongoose');
//
// var isLogged=require('../libs/isLogged');
// var getUser=require('../libs/getUser');
exports.get=async function(ctx, next) {
    var more_info = {
        author_img: 'people.svg',
        author_name: 'Вася Вася',
        need_people: [
            {
                position: 'программист JS',
                isFound: true
            },
            {
                position: 'Маркетолог',
                isFound: false
            },
            {
                position: 'Дизайнер',
                isFound: true
            }
        ]
    };
    var startups = [
        {title: 'Площадка для ddddстартапов', body: 'Создать сайт, где люди смогут обхединяться в стартапы и создавать их.', id: 3, more_info: more_info},
        {title: 'Площадка для стартапов', body: 'Создать сайт, где люди смогут обхединяться в стартапы и создавать их.', id: 4, more_info: more_info},
        {title: 'Площадка для стартапов', body: 'Создать сайт, где люди смогут обхединяться в стартапы и создавать их.', id: 5, more_info: more_info},
        {title: 'Площадка для стартапов', body: 'Создать сайт, где люди смогут обхединяться в стартапы и создавать их.', id: 6, more_info: more_info},
        {title: 'Площадка для стартапов', body: 'Создать сайт, где люди смогут обхединяться в стартапы и создавать их.', id: 7, more_info: more_info},
        {title: 'Площадка для стартаdwadwв', body: 'Создать сайт, где люди смогут обхединяться в стартапы и создавать их.', id: 8, more_info: more_info}];
 var req=ctx.request;
    ctx.body=startups;

};
