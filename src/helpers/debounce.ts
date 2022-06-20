export function debounce(cb: Function, time: number): Function {
    let flag = true;
    return function (...args: any[]) {
        if (!flag) return;
        flag = false;
        cb(...args);
        setTimeout(() => (flag = true), time);
    };
}
