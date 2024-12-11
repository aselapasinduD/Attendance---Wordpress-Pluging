document.addEventListener('DOMContentLoaded', () => {
    const timeElements = document.querySelectorAll('.attendance-current-time');
    if (timeElements.length > 0){
        setInterval(() => {
            const currentTime = new Date();
            const hours = currentTime.getHours().toString().padStart(2, '0');
            const minutes = currentTime.getMinutes().toString().padStart(2, '0');
            const seconds = currentTime.getSeconds().toString().padStart(2, '0');
            const formattedTime = `${hours}:${minutes}:${seconds}`;
            timeElements.forEach(element => {
                element.textContent = formattedTime;
            });
        }, 1000);
    }
});