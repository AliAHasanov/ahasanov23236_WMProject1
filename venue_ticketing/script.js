const sections=[
    {name:"VIP", rows:2,seats:25, price:50, code:"VIP"},
    {name:"General Admission", rows:5,seats:25, price:25, code:"GAD"},
    {name:"Balcony",rows:3,seats:15, price:35, code:"BAL"}
]
const unavailable=["VIP-1-3","VIP-2-12","VIP-2-21","GAD-1-1","GAD-4-13","GAD-3-21","GAD-5-23","BAL-1-1","BAL-3-15","BAL-2-13"];



function generateSeats(sections){
    let all_seats=[];
    for(const section of sections){
        for(let i=1;i<=section.rows;i++){
            for(let j=1;j<=section.seats;j++){

                const id=`${section.code}-${i}-${j}`;
                all_seats.push({id:id,section:section.name,row:i,seat:j,price:section.price,status:unavailable.includes(id)?"unavailable":"available"});
                
            }
        }
    }
    return all_seats;
}

seats=generateSeats(sections);

console.log(seats.length);
let counter=0;
for(let i=0;i<seats.length;i++){
    if(seats[i].status==="unavailable"){
        counter++;
    }
}
console.log(counter);