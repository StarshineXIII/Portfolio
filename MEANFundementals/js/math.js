function zero_negativity(arr){
    for(var i=0; i<=arr.length;i++){
        if(arr[i]<0){
            return true;
        }
        else{
            return false;}
    }
}
zero_negativity([2,3,4]);

function is_even(n){
    if(n%2===0){
        return true;
    }
    else{
        return false;}
}
is_even(23);

function how_many_even(arr){
    var count=0;
    for(var i=0;i<arr.length;i++){
        if(arr[i]%2===0){
            count ++;
        }
    }
    return count;
}
how_many_even([2,3,4,5,6,7,8,9]);

funtion create_dummy_array(n){
    var arr = [];
    for(i=0;i<n;i++){
        arr.push(Math.floor(Math.random() * 10));
    }
    return arr;
}
create_dummy_array();

function random_choice(arr){
    return(Math.floor(Math.random() * arr.length));
}
random_choice([1,3,4,6,8,3,4,0,1]);