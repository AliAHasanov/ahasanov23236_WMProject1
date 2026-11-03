const sections=[
    {name:"VIP", rows:2,seats:25, price:50},
    {name:"General Admission", rows:5,seats:25, price:25},
    {name:"Balcony",rows:3,seats:15, price:35}
]

function generateSeats(sections){
    let all_seats=[];
    for(const section of sections){
        for(let i=1;i<=section.rows;i++){
            for(let j=1;j<=section.seats;j++){
                all_seats.push({id:`${section.name}-${i}-${j}`,section:section.name,row:i,seat:j,price:section.price});
            }
        }
    }
    return all_seats;
}

console.log(generateSeats(sections).length);
console.log(generateSeats(sections)[0]);