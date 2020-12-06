export function string_to_array(string) {
    if(Array.isArray(string)){
        return string
    }
    if(!string.includes(",")){
        return [string]
    }
    var arr = string.split(","); 
    
    arr.forEach(elem => {
        elem = elem.trim();
    });

    return arr;
}

export function array_to_string(arr) {
    return arr.join(",");
}

export function check_string(str) {
    var string = str.trim();

	if(string.match(/[\s]/)) 
		return true
	
	if(string.length == 0)
		return true

    return false
}


// Source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export function remove_duplicates(array) {
  let list = array.sort();
  var counts = {};
  list.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
  let final = []
  let index = 0

  for(const [key,value] of Object.entries(counts)) {
    if (value > 1)
      final.push("" + key + " x " + value);
    else 
      final.push(""+key);
  }

  return final
}