const ab3 = [0];
const cd3 = [3];
for (let k = 0; k < 4; k++) { 
  // let a_a = ab3[0]
  // let b_b = cd3[0]
  console.log("[" + ab3[0] +"]" + "[" + cd3[0] + "]");
  ab3[0] = ++ab3[0];
  cd3[0] = --cd3[0];
} 

// [null, null, null, null]
const len = 4
const line = Array(len**2).fill(null)
line.map((v, i) => {
  const row = Math.floor(i / len)
  const col = (len - 1) - (i % len)
  console.log(row, col)
})


for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
  console.log("[" + i +"]" + "[" +j+ "]");
  console.log("[" + j +"]" + "[" +i+ "]");
  }
}
for (let i = 0; i < 9; i++) {
  console.log("[" + i +"]" + "[" +i+ "]");
}
for (let i = 0; i >3; i++) {
  for (let j = 3; j > 0; j--) {
  console.log("[" + i +"]" + "[" +j + "]");
  }
}  

const lines= [
  for (let i = 0; i < 9; i++) {
    console.log("[" + i +"]" + "[" +i+ "]");
  }

  [1,1,1],
  [2,2,2]
]

const hantei_list= new Array();
const masu = Array(4).fill(null).map((a,i) => Array(4).fill(null).map((b, j) => ((4*i)+j)))

const liness = (new Array(8)).fill((new Array(10)).fill((new Array(2)).fill(0)));
for (let i = 0; i < 8; i++) {
 for (let j = 0; j < 10; j++) {
  for (let k = 0; k < 2; k++) {
    liness[i][j][k]=k;
    liness[i][j][k,k]=k;
  }
 }
}

const lines_a = []
for(let i = 0; i < 10; i++){
  lines_a.push([i, i])
}

const lines_b = []
const len =10;
for(let i = 0; i < 10; i++){
  lines_b.push([i, (len - 1) -i ])
}

const lines_c = []
const len =10;
for(let i = 0; i < 10; i++){
  for(let j = 0; j < 10; j++){  
    lines_c.push([i, j])
  }
}

const lines_d = []
const len =10;
for(let i = 0; i < 10; i++){
  for(let j = 0; j < 10; j++){  
    lines_d.push([j, i])
  }
}


const len = 10
const arr = Array(10).fill(null).map((a,i) => Array(len).fill(null).map((b, j) => (null)))