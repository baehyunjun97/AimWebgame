let score = 0;
let gameStarted = false;
let shiningBox = null; // 빛나는 박스 관리
let timerInterval; // 타이머 인터벌 변수
let seconds = 30; // 초기 타이머 설정

//게임 시작 버튼에 onclick으로 지정해둠.
function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        score = 0;
        seconds = 30;
        document.querySelector('#score').innerHTML = score;
        document.querySelector('.btn-15').innerText ='예약진행중!';

        // 타이머 시작
        timerInterval = setInterval(updateTimer, 1000); //1초마다 업데이트 타이머(가장아래)
        setTimeout(endGame, seconds * 1000); // 타임아웃 endGame

        createBox();
    }
}

/* 실시간 타이머 */
const timerText = document.querySelector('#timer');
function updateTimer() {
    timerText.innerHTML = seconds -1;
    seconds--;
}

// 30초 되면 정지
function endGame() {
    timerText.innerHTML=0;
    document.querySelector('.btn-15').innerText ='다시 해볼까?';
    shiningBox.classList.remove("shine"); // shine 클래스 제거
    gameStarted = false;
    clearInterval(timerInterval); // 인터벌 삭제
    alert("게임 종료! 당신의 스코어는 " + score + "입니다.");
}

function createBox() {
    if (gameStarted) {
        //박스 클래스 div들을 모조리 배열로 저장한다.
        const boxes = document.querySelectorAll(".box");

        // 이미 빛나는 박스가 있다면.
        // 이거 빼니까 모양이 안사라지거나, 모양이 사라져도 클릭하면 점수가 올라가버림.
        if (shiningBox) {
            shiningBox.classList.remove("shine");  //샤인 클래스 제거 (모양새)
            shiningBox.removeEventListener("click", handleBoxClick); // 클릭 이벤트 핸들러 삭제
        }

        //랜덤 * 렝스(64)가 0번째 박스까지 포함
        const randomIndex = Math.floor(Math.random() * boxes.length);
        shiningBox = boxes[randomIndex];
        shiningBox.classList.add("shine");
        shiningBox.addEventListener("click", handleBoxClick); // 클릭 이벤트 추가

        setTimeout(createBox, 3000);
    }
}

// 클릭 이벤트 핸들러
function handleBoxClick() {
    if (gameStarted) {
        score++;
        document.querySelector("#score").textContent = score;
        shiningBox.classList.remove("shine"); // 클릭하면 shine 클래스 제거
        shiningBox.removeEventListener("click", handleBoxClick); // 클릭 이벤트 제거
        createBox();
    }
}




