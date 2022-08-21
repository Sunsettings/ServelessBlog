schema协议的设计
就是一个json，页面设计格式需要向这个json靠近
{
    name: 'Page',
    attributes: {
        title:'Dell's blog',
        description:'description'
    }
    children: [
        {
            name:'Banner',
            attributes:{
                title:'title',
                description:'description',
                showSmallPic: true,
                SmallPicUrl:'https://serverless-project-static-filesqlb.oss-cn-hangzhou.aliyuncs.com/images/avatar.jpg',
                backgroundUrl:'https://serverless-project-static-filesqlb.oss-cn-hangzhou.aliyuncs.com/images/bg.jpeg',
                backgroundHeight:'100px'
            }
            children:[
                {
                    name:'Course'，
                    attributes;{
                        title:'Vue3 系统入门与项目实战',
                        description:'课程从 Vue3 基础语法，到组件原理、动画、代码设计，再到新语法扩展，全面系统地梳理 Vue 知识点。学习过程中，老师将倾囊相授多年的“避坑经验” ，带你以企业级代码质量和工程开发流程完成“京东到家”应用，实现对框架的彻底掌握。',
                        link:''
                    }
                }
            ]
        },
        {
    name: 'List',
    attributes: {
        title:'热卖课程'
    }
    children: [
        {
        name:'Item',
        attributes: {
            title:'Vue3 系统入门与项目实战',
            description:'课程从 Vue3 基础语法，到组件原理、动画、代码设计，再到新语法扩展，全面系统地梳理 Vue 知识点。学习过程中，老师将倾囊相授多年的  “避坑经',
            imageUrl:'https://serverless-project-static-filesqlb.oss-cn-hangzhou.aliyuncs.com/images/kecheng.png(https://serverless-project-static-filesqlb.oss-cn-hangzhou.aliyuncs.com/images/ts.jpg)',
            link:''
        },
        children:[]
    }]
    },
    {
        name:'Footer',
        attributes:{
            copyright:'',
            record:''
        },
        children:[{
            name:'Link',
            attributes: {
                title:'Vue3 系统入门与项目实战',
                link:''
            },
            children:[]
        }]
    }

    ]
}

http://statics.blog.qlb-blog.top/code/static/css/index.8106ca85.css
http://statics.qlb-blog.top/code/static/css/index.8106ca85.css