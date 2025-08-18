// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      // NAV / COMMON
      home: "Home",
      login: "Login",
      register: "Register",
      logout: "Logout",
      profile: "Profile",
      about: "About Us",
      contact: "Contact",
      leaves: "Leave Requests",
      hrLeaves: "HR - Leaves",

      // HOME
      welcomeMessage: "Welcome to the HRM System",
      chooseAction: "Please choose an action:",
      userDashboardTitle: "User Dashboard",
      viewProfile: "View Profile",
      viewTasks: "View Tasks",
      hrDashboardTitle: "HR Dashboard",
      addEmployee: "Add Employee",
      viewReports: "View Reports",
      manageUsers: "Manage Users",

      // LOGIN
      loginTitle: "Login",
      username: "Username",
      usernamePlaceholder: "Enter your username",
      password: "Password",
      passwordPlaceholder: "Enter your password",
      loginButton: "Login",
      loginError: "Login failed, please check your credentials.",

      // REGISTER
      registerTitle: "Create New Account",
      email: "Email",
      emailPlaceholder: "Enter your email",
      confirmPassword: "Confirm Password",
      confirmPasswordPlaceholder: "Re-enter your password",
      phone: "Phone",
      phonePlaceholder: "Enter your phone number",
      role: "Role",
      roleApplicant: "Applicant",
      roleHR: "HR",
      registerButton: "Register",
      registerError: "Registration failed, please try again.",
      registerSuccess: "Registered successfully! You can login now.",
      passwordMismatch: "Passwords do not match.",

      // ABOUT
      aboutTitle: "About Our HRM System",
      aboutDescription:
        "Our HRM (Human Resource Management) system helps businesses manage employees efficiently. From recruitment to payroll, our platform provides all the tools needed to streamline HR processes and improve productivity.",

      // PROFILE
      profileTitle: "My Profile",
      loading: "Loading...",
      notLoggedIn: "You are not logged in.",
      fetchError: "Failed to load profile.",
      updateSuccess: "Profile updated successfully.",
      updateError: "Failed to update profile.",
      saveChanges: "Save changes",
      saving: "Saving...",
      cancel: "Cancel",

      // CONTACT
      contactDescription: "You can reach us via the following methods:",

      // Role labels
      roleLabel: {
        applicant: "Applicant",
        employee: "Employee",
        manager: "Manager",
        hr: "HR",
        admin: "Admin",
      },

      // JOBS (public/apply)
      jobs: "Jobs",
      jobsTitle: "Available Jobs",
      applyNow: "Apply Now",
      noJobs: "No jobs right now.",
      applyJobTitle: "Apply for Job",
      fullName: "Full name",
      coverLetter: "Cover letter",
      cvLabel: "Upload CV (PDF/DOC)",
      submitApplication: "Submit Application",
      sending: "Sending...",
      applySuccess: "Application submitted successfully.",
      applyError: "Failed to submit. Please check your inputs.",

      // HR JOBS ADMIN
      jobsAdmin: "Manage Jobs",
      created: "Created",
      updated: "Updated",
      editJob: "Edit Job",
      addJob: "Add Job",
      jobTitle: "Title",
      description: "Description",
      employmentType: "Employment Type",
      fullTime: "Full Time",
      partTime: "Part Time",
      contract: "Contract",
      intern: "Intern",
      active: "Active",
      inactive: "Inactive",
      create: "Create",
      edit: "Edit",
      delete: "Delete",
      actions: "Actions",
      status: "Status",
      search: "Search",
      reset: "Reset",
      searchPlaceholder: "Search title/location...",
      confirmDelete: "Delete this job?",

      // LEAVES PAGE (NEW)
      leaveCenterTitle: "Leave Center",
      leaveRequestsTitle: "Leave Requests",
      hrMode: "HR mode",
      employeeMode: "Employee mode",
      table: {
        idx: "#",
        employee: "Employee",
        from: "From",
        to: "To",
        reason: "Reason",
        state: "Status",
        actions: "Actions",
        noData: "No requests",
        approve: "Approve",
        reject: "Reject"
      },
      leaveState: {
        pending: "pending",
        approved: "approved",
        rejected: "rejected"
      },
      authHint: "Auth mode",

      leaveForm: {
        title: "Submit Leave Request",
        submit: "Send",
        submitting: "Sending...",
        success: "Leave request submitted successfully.",
        error: "Failed to submit the request.",
        dateInvalid: "End date must be after or equal to start date.",
        netErrJwt: "Network Error. Check API base URL and your token.",
        netErrSession: "Network Error. Check CORS/CSRF settings in Django with credentials."
        }

    },
  },

  ar: {
    translation: {
      // NAV / COMMON
      home: "الرئيسية",
      login: "تسجيل الدخول",
      register: "إنشاء حساب",
      logout: "تسجيل الخروج",
      profile: "الملف الشخصي",
      about: "من نحن",
      contact: "للتواصل",
      leaves: "طلبات الإجازة",
      hrLeaves: "لوحة الإجازات (HR)",

      // HOME
      welcomeMessage: "مرحباً بك في نظام إدارة الموارد البشرية",
      chooseAction: "اختر ما تريد:",
      userDashboardTitle: "لوحة تحكم المستخدم",
      viewProfile: "عرض الملف الشخصي",
      viewTasks: "عرض المهام",
      hrDashboardTitle: "لوحة تحكم الموارد البشرية",
      addEmployee: "إضافة موظف",
      viewReports: "عرض التقارير",
      manageUsers: "إدارة المستخدمين",

      // LOGIN
      loginTitle: "تسجيل الدخول",
      username: "اسم المستخدم",
      usernamePlaceholder: "أدخل اسم المستخدم",
      password: "كلمة المرور",
      passwordPlaceholder: "أدخل كلمة المرور",
      loginButton: "دخول",
      loginError: "فشل تسجيل الدخول، تحقق من البيانات.",

      // REGISTER
      registerTitle: "إنشاء حساب جديد",
      email: "البريد الإلكتروني",
      emailPlaceholder: "أدخل بريدك الإلكتروني",
      confirmPassword: "تأكيد كلمة المرور",
      confirmPasswordPlaceholder: "أعد إدخال كلمة المرور",
      phone: "رقم الهاتف",
      phonePlaceholder: "أدخل رقم الهاتف",
      role: "الدور",
      roleApplicant: "متقدم",
      roleHR: "الموارد البشرية",
      registerButton: "إنشاء حساب",
      registerError: "فشل إنشاء الحساب، حاول مرة أخرى.",
      registerSuccess: "تم إنشاء الحساب! يمكنك تسجيل الدخول الآن.",
      passwordMismatch: "كلمتا المرور غير متطابقتان.",

      // ABOUT
      aboutTitle: "عن نظام إدارة الموارد البشرية",
      aboutDescription:
        "نظام إدارة الموارد البشرية لدينا يساعد الشركات على إدارة الموظفين بكفاءة. من التوظيف إلى الرواتب، توفر منصتنا جميع الأدوات اللازمة لتبسيط عمليات الموارد البشرية وزيادة الإنتاجية.",

      // PROFILE
      profileTitle: "الملف الشخصي",
      loading: "جاري التحميل...",
      notLoggedIn: "لست مسجّل الدخول.",
      fetchError: "فشل تحميل بيانات البروفايل.",
      updateSuccess: "تم تحديث البروفايل بنجاح.",
      updateError: "فشل تحديث البروفايل.",
      saveChanges: "حفظ التغييرات",
      saving: "جارٍ الحفظ...",
      cancel: "إلغاء",

      // CONTACT
      contactDescription: "يمكنك التواصل معنا عبر الطرق التالية:",

      // Role labels
      roleLabel: {
        applicant: "متقدّم",
        employee: "موظف",
        manager: "مدير",
        hr: "الموارد البشرية",
        admin: "مدير النظام",
      },

      // JOBS (public/apply)
      jobs: "الوظائف",
      jobsTitle: "الوظائف المتاحة",
      applyNow: "قدّم الآن",
      noJobs: "لا توجد وظائف حالياً.",
      applyJobTitle: "التقديم على وظيفة",
      fullName: "الاسم الكامل",
      coverLetter: "خطاب التغطية",
      cvLabel: "رفع السيرة الذاتية (PDF/DOC)",
      submitApplication: "إرسال الطلب",
      sending: "جارٍ الإرسال...",
      applySuccess: "تم إرسال طلبك بنجاح.",
      applyError: "فشل الإرسال. تحقق من البيانات.",

      // HR JOBS ADMIN
      jobsAdmin: "إدارة الوظائف",
      created: "تم الإنشاء",
      updated: "تم التعديل",
      editJob: "تعديل وظيفة",
      addJob: "إضافة وظيفة",
      jobTitle: "المسمى الوظيفي",
      description: "الوصف",
      employmentType: "نوع التوظيف",
      fullTime: "دوام كامل",
      partTime: "دوام جزئي",
      contract: "عقد",
      intern: "متدرب",
      active: "نشطة",
      inactive: "متوقفة",
      create: "إنشاء",
      edit: "تعديل",
      delete: "حذف",
      actions: "إجراءات",
      status: "الحالة",
      search: "بحث",
      reset: "إعادة",
      searchPlaceholder: "ابحث بالعنوان/الموقع...",
      confirmDelete: "هل تريد حذف الوظيفة؟",

      // LEAVES PAGE (NEW)
      leaveCenterTitle: "مركز الإجازات",
      leaveRequestsTitle: "طلبات الإجازة",
      hrMode: "وضع HR",
      employeeMode: "وضع موظف",
      table: {
        idx: "#",
        employee: "الموظف",
        from: "من",
        to: "إلى",
        reason: "السبب",
        state: "الحالة",
        actions: "إجراءات",
        noData: "لا توجد طلبات",
        approve: "قبول",
        reject: "رفض"
      },
      leaveState: {
        pending: "قيد الانتظار",
        approved: "مقبول",
        rejected: "مرفوض"
      },
      authHint: "وضع التوثيق",
      leaveForm: {
        title: "إرسال طلب إجازة",
        submit: "إرسال",
        submitting: "جارٍ الإرسال...",
        success: "تم إرسال طلب الإجازة بنجاح.",
        error: "فشل إرسال الطلب.",
        dateInvalid: "تاريخ النهاية يجب أن يكون بعد أو يساوي تاريخ البداية.",
        netErrJwt: "خطأ في الشبكة. تأكد من رابط الـAPI والتوكن.",
        netErrSession: "خطأ في الشبكة. تحقق من إعدادات CORS/CSRF في Django مع withCredentials."
      }

    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ar", // اللغة الافتراضية
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

// ✅ اضبط الاتجاه فورًا حسب اللغة الحالية
const applyDir = (lng) => {
  if (lng === "ar") {
    document.documentElement.dir = "rtl";
    document.documentElement.lang = "ar";
  } else {
    document.documentElement.dir = "ltr";
    document.documentElement.lang = "en";
  }
};
applyDir(i18n.language);

// ✅ وغير الاتجاه عند تغيير اللغة
i18n.on("languageChanged", (lng) => applyDir(lng));

export default i18n;
