function initSwiper() {
    /* 
    id="comment-swiper" 區塊是我想要使用 swiper 套件的範圍
    要抓取 id "#comment-swiper"
    */
    const swiper = new Swiper(".commentSwiper", {
        // autoplay: {
        //     delay: 2000, // 每張圖片之間的時間間隔（毫秒）
        //     disableOnInteraction: false, // 使用者互動後是否停止自動輪播
        // },
        //間隔
        spaceBetween: 24,
        /*  預設要顯示幾個卡片 */
        slidesPerView: 1,
        /* 斷點設定 */
        breakpoints: {
            /* 螢幕寬度大於等於 992px 時切換為 3 欄 */
            992: {
                slidesPerView: 3
            },
            /* 螢幕寬度大於等於 768px 時切換為 2 欄 */
            768: {
                slidesPerView: 2
            },
            // /* 更小時都顯示 1 欄 */
            // 0: {
            //     slidesPerView: 1
            // }
        },

        //切換幻燈片開啟true or禁止false
        allowSlideNext: true,
        allowSlidePrev: true,
        //無法拖曳幻燈片切換
        allowTouchMove: true,
        /* 卡片元素的間隔 */

        // //換頁按鈕，需對應html上的class名稱
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            /* 我想將分頁圓點綁在哪個 class */
            el: ".swiper-pagination",
            /* 將輪播設定為可以點擊分頁圓點來切換圖片 */
            clickable: true
        }
    });
}
initSwiper();