import styles from './input-styles-helper.module.scss';
export default function getInputClass(
    value: string,
    errors: Record<string, any>,
    formStateValid: Record<string, any>,
    formStateFocus: Record<string, any>,
    formStateValue: Record<string, any>
) {
    if (errors[value] && !formStateValid[value]) {
        return styles.inputError;
    }
    if (formStateValid[value] && !errors[value]) {
        return styles.inputValid;
    }
    if (
        !formStateValid[value] &&
        !errors[value] &&
        formStateFocus[value] &&
        formStateValue[value].length > 0
    ) {
        return styles.inputFocus;
    }
    return styles.inputDefault;
}
