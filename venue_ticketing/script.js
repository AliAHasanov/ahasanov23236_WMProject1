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

let currentRow;
let currentSection;
const display=document.querySelector("#display");
for (const s of seats) {
    if(s.section!==currentSection){
        currentSection=s.section;
        sectionBox=document.createElement("div");
        sectionBox.classList.add("section-block");
        const heading=document.createElement("h3");
        heading.textContent=`${s.section} (${s.price} manat)`;
        sectionBox.append(heading);
        display.append(sectionBox);
    }

    if(s.row!==currentRow){
        currentRow=s.row;
        rowBox=document.createElement("div");
        rowBox.classList.add("seat-row");
        sectionBox.append(rowBox);
    }

    const button=document.createElement("button");
    button.type="button";
    button.textContent=`${s.seat}`;
    button.classList.add("seat");
    rowBox.append(button);

    button.classList.add("seat", `seat-${s.status}`);
    button.dataset.seatId=s.id;
    button.setAttribute("aria-label",`Section ${s.section}, Row ${s.row}, Seat ${s.seat}, Price ${s.price}, ${s.status}`);
}

const state={selectedId:null,cartIds:[]};

const section_det=document.querySelector("#section-details");
const row_det=document.querySelector("#row-details");
const seat_det=document.querySelector("#seat-number-details");
const price_det=document.querySelector("#price-details");
const status_det=document.querySelector("#status-details");
const add_to_cart=document.querySelector("#add-to-cart");
console.log(section_det,row_det,seat_det,price_det,status_det);


function showDetails(seat){
    section_det.textContent=seat.section;
    row_det.textContent=seat.row;
    seat_det.textContent=seat.seat;
    price_det.textContent=`${seat.price} Manat`;
    status_det.textContent=seat.status;
    add_to_cart.disabled=(seat.status==="unavailable");
}

display.addEventListener("click", (e)=>{
    const clickedSeat= e.target.closest(".seat"); 
    if(clickedSeat===null){
        return;
    }
    const previousSeat=display.querySelector(".seat-inspected");
    if(previousSeat!==null){
        previousSeat.classList.remove("seat-inspected");
    }
    clickedSeat.classList.add("seat-inspected");
    const result=clickedSeat.dataset.seatId;
    console.log(result);
    const full_seat=seats.find(seat => seat.id===result);
    console.log(full_seat);
    state.selectedId=full_seat.id;
    showDetails(full_seat);
})

add_to_cart.addEventListener("click",()=>{
    if(state.selectedId===null){
        return;
    }
    else if(state.cartIds.includes(state.selectedId)){
        return;
    }
    state.cartIds.push(state.selectedId);
    console.log(state.cartIds);
    render();
})

function render(){
    for (const seat of display.querySelectorAll(".seat")) {
        const inCart=state.cartIds.includes(seat.dataset.seatId);
        seat.classList.toggle("seat-in-cart", inCart);
    }
}

