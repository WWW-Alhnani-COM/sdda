// بيانات التكوين (تجدها في لوحة تحكم PayTabs)
const CONFIG = {
    PROFILE_ID: "129940",
    SERVER_KEY: "S2J99LTTK9-JMWTGZL2DT-HKRZR2RDK6", // مفتاح الخادم الخاص بالاختبار
    REGION_URL: "https://secure.paytabs.sa/payment/request"
};


async function createTestPayment() {
    console.log("--- بدء عملية إنشاء رابط دفع تجريبي ---");

    const paymentData = {
        "profile_id": CONFIG.PROFILE_ID,
        "tran_type": "sale",
        "tran_class": "ecom",
        "cart_id": "TEST_ORDER_" + Math.floor(Math.random() * 1000),
        "cart_currency": "SAR", // أو العملة المفعلة في حسابك
        "cart_amount": 50.00,
        "cart_description": "تجربة دفع بسيطة",
        "callback": "https://webhook.site/test", // رابط وهمي للاختبار
        "return": "https://google.com",         // الرابط الذي سيعود له العميل
        "customer_details": {
            "name": "Mohammad Test",
            "email": "test@example.com",
            "phone": "0500000000",
            "street1": "Main St",
            "city": "Riyadh",
            "state": "RI",
            "country": "SA",
            "zip": "12345"
        },
        "lang": "ar"
    };

    try {
        const response = await fetch(CONFIG.REGION_URL, {
            method: 'POST',
            headers: {
                'Authorization': CONFIG.SERVER_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paymentData)
        });

        const data = await response.json();

        if (data.redirect_url) {
            console.log("✅ نجاح!");
            console.log("رابط صفحة الدفع:");
            console.log("---------------------------------------");
            console.log(data.redirect_url);
            console.log("---------------------------------------");
            console.log("قم بنسخ الرابط وفتحه في المتصفح لتجربة الدفع.");
        } else {
            console.error("❌ فشل الطلب:");
            console.log(data);
        }

    } catch (error) {
        console.error("🚨 خطأ في الاتصال بالـ API:", error.message);
    }
}

// تشغيل الدالة
createTestPayment();
