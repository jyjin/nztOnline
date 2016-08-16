// // js,css,png 加 md5
// fis.match('*.{js,css,png}', {
//     useHash: true
// });

// //压缩js
// fis.match('*.js', {
//   // fis-optimizer-uglify-js 插件进行压缩，已内置
//   optimizer: fis.plugin('uglify-js')
// });

// 启用 fis-spriter-csssprites 插件
fis.match('::package', {
    spriter: fis.plugin('csssprites')
})
fis.config.set('settings.spriter.csssprites', {
    scale: 2
})

fis.config.set('settings.spriter.csssprites', {
    //图之间的边距
    margin: 2,
    //使用矩阵排列方式，默认为线性`linear`
    layout: 'matrix'
});

// 对 CSS 进行图片合并
fis.match('*.css', {
    // 给匹配到的文件分配属性 `useSprite`
    useSprite: true
});


// //压缩css
// fis.match('*.css', {
//     // fis-optimizer-clean-css 插件进行压缩，已内置
//     optimizer: fis.plugin('clean-css')
// });

fis.match('*.png', {
    // fis-optimizer-png-compressor 插件进行压缩，已内置
    optimizer: fis.plugin('png-compressor')
});

// fis.match('::packager', {
//     postpackager: fis.plugin('loader', {
//         allInOne: true
//     })
// });
