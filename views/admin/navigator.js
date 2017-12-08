const navigator = [
    {
        "text": "站点管理",
        "link": "/admin/siteManagement",
        "children": [
            {
                "text": "修改密码",
                "link": "/admin/siteManagement/modifyPassword"
            }, {
                "text": "站点信息",
                "link": "/admin/siteManagement/siteInformation"
            }, {
                "text": "功能设置",
                "link": "/admin/siteManagement/functionSet"
            }
        ]
    }, {
        "text": "内容管理",
        "link": "/admin/contentManagement",
        "children": [
            {
                "text": "文章管理",
                "link": "/admin/contentManagement/articleManagement"
            }, {
                "text": "分类管理",
                "link": "/admin/contentManagement/categoryManagement"
            }, {
                "text": "评论管理",
                "link": "/admin/contentManagement/commentManagement"
            }
        ]
    }, {
        "text": "用户管理",
        "link": "/admin/userManagement",
        "children": [
            {
                "text": "用户管理",
                "link": "/admin/userManagement/userManagement"
            }
        ]
    }, {
        "text": "财务管理",
        "link": "/admin/financialManagement",
        "children": [
            {
                "text": "财务管理",
                "link": "/admin/financialManagement/financialManagement"
            }
        ]
    }, {
        "text": "数据统计",
        "link": "/admin/statistics",
        "children": [
            {
                "text": "财务管理",
                "link": "/admin/statistics/statistics"
            }
        ]
    }
];

export default navigator;