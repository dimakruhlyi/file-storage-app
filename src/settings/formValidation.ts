enum FormErrorType {
    Required = 'required',
    MaxLength = 'maxLength',
    MinLength = 'minLength',
}

export const EMAIL_PATTERN = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

export function getFormValidationMessage(errorType: string | undefined): string {
    switch(errorType) {
        case FormErrorType.Required:
            return 'This field is required';
        case FormErrorType.MaxLength:
            return 'Data is too long';
        case FormErrorType.MinLength:
            return 'Data is too short';
        default:
            return '';
    }
}