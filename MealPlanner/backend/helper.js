export function string_to_array(string) {
    var arr = string.split(","); 
    
    arr.forEach(elem => {
        elem = elem.trim();
    });

    return arr;
}

export function array_to_string(arr) {
    return arr.join(",");
}