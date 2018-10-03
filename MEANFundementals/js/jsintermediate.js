function starString(str, num){
    if(num > 0){
        return str.repeat(num);
    }
}
starString("*",8);




function drawStars(str, arr){
    for(var i = 0; i < arr.length;i++){
            console.log(str.repeat(arr[i]));
    }
}
drawStars("*", [1,3,5,7,4,3]);



