export class PaymentValidator {
  static validatePhone(phone: string): string | null {
    if (!phone) {
      return 'رقم الجوال مطلوب';
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.startsWith('0')) {
      if (cleanPhone.length !== 10) {
        return 'يجب أن يتكون رقم الجوال من 10 أرقام عند البدء بـ 0';
      }
    } else if (cleanPhone.startsWith('5')) {
      if (cleanPhone.length !== 9) {
        return 'يجب أن يتكون رقم الجوال من 9 أرقام عند البدء بـ 5';
      }
    } else {
      return 'يجب أن يبدأ رقم الجوال بـ 0 أو 5';
    }

    return null;
  }

  static validateName(name: string, fieldName: string): string | null {
    if (!name) {
      return `${fieldName} مطلوب`;
    }
    if (name.length < 2) {
      return `${fieldName} يجب أن يتكون من حرفين على الأقل`;
    }
    return null;
  }

  static validateEmail(email: string): string | null {
    if (!email) {
      return 'البريد الإلكتروني مطلوب';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'البريد الإلكتروني غير صحيح';
    }
    return null;
  }

  static validatePaymentMethod(method: string): string | null {
    if (!method) {
      return 'يرجى اختيار طريقة الدفع';
    }
    return null;
  }
}
