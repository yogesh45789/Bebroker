export default {
    auth:{
        send_otp:"/api/vendors/send-otp/",
        verify_otp:"/api/vendors/verify-otp/",
    },
    refreshToken:"",
    get_vendor_detail:"/api/vendors/get-vendor-details/",
    dashboard:{
        get_service_list:"/api/vendors/get-service-list/",
        update_service_list:"/api/vendors/update-service-inquiry/",
        comment_on_service_inquiry:"/api/vendors/comment-on-service-inquiry/",
        get_comment_list: "/api/vendors/get-comment-list/",
        // get_service_list:"/api/vendors/get-service-list/",
    },
    support:{
        post_query:"/api/vendors/post-query/",
    },
    faqs:{
        get_vendor_faqs:"/api/faqs/get-vendor-faqs/",
    }
};
