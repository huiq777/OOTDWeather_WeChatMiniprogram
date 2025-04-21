// Shared functions for all pages

// Tab bar navigation
function switchTab(tabName) {
    if (tabName === 'ootd') {
        window.location.href = 'ootd.html';
    } else if (tabName === 'profile') {
        window.location.href = 'profile.html';
    }
}

// Toggle popup visibility
function togglePopup(popupId) {
    const popup = document.getElementById(popupId);
    const mask = document.getElementById(popupId + '-mask');
    
    if (popup.classList.contains('visible')) {
        popup.classList.remove('visible');
        mask.classList.remove('visible');
    } else {
        popup.classList.add('visible');
        mask.classList.add('visible');
    }
}

// Carousel functionality
function initCarousel(carouselId) {
    const carousel = document.getElementById(carouselId);
    const inner = carousel.querySelector('.carousel-inner');
    const items = carousel.querySelectorAll('.carousel-item');
    const indicators = carousel.querySelectorAll('.carousel-indicator');
    let currentIndex = 0;
    
    // Set initial state
    updateCarousel();
    
    // Add indicator click events
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });
    
    // Add touch events for swiping
    let startX = 0;
    let endX = 0;
    
    inner.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    inner.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        
        if (startX - endX > 50) { // Swipe left
            if (currentIndex < items.length - 1) {
                currentIndex++;
                updateCarousel();
            }
        } else if (endX - startX > 50) { // Swipe right
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        }
    });
    
    function updateCarousel() {
        // Update inner position
        inner.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Auto slide every 3 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
    }, 3000);
}

// Select style option
function selectStyle(element, groupName) {
    // Remove selected class from all options in the same group
    const options = document.querySelectorAll(`[data-group="${groupName}"]`);
    options.forEach(option => option.classList.remove('selected'));
    
    // Add selected class to clicked option
    element.classList.add('selected');
}

// Save user profile
function saveUserProfile() {
    const city = document.getElementById('city').value;
    const gender = document.getElementById('gender').value;
    const description = document.getElementById('description').value;
    
    // In a real app, we would save this to storage or backend
    // For this prototype, we'll just save to localStorage
    localStorage.setItem('userCity', city);
    localStorage.setItem('userGender', gender);
    localStorage.setItem('userDescription', description);
    
    // Redirect to OOTD page
    window.location.href = 'ootd.html';
}

// Load user profile
function loadUserProfile() {
    const city = localStorage.getItem('userCity') || '';
    const gender = localStorage.getItem('userGender') || '';
    const description = localStorage.getItem('userDescription') || '';
    
    if (document.getElementById('city')) {
        document.getElementById('city').value = city;
    }
    
    if (document.getElementById('gender')) {
        document.getElementById('gender').value = gender;
    }
    
    if (document.getElementById('description')) {
        document.getElementById('description').value = description;
    }
    
    return { city, gender, description };
}

// Generate OOTD recommendation
function generateOOTD() {
    // Get selected style
    let selectedStyle = document.querySelector('.style-option.selected');
    
    if (!selectedStyle) {
        alert('请选择一个风格');
        return;
    }
    
    // Get stored weather data
    const weatherData = getCurrentWeather();
    
    // Get user profile
    const userProfile = loadUserProfile();
    
    // Format the recommendation text based on weather and style
    let recommendationText = formatRecommendation(weatherData, selectedStyle.textContent);
    
    // Update selected style name in the popup
    const selectedStyleNameElement = document.getElementById('selected-style-name');
    if (selectedStyleNameElement) {
        selectedStyleNameElement.textContent = selectedStyle.textContent;
    }
    
    // Update recommendation text
    document.getElementById('ootd-recommendation').textContent = recommendationText;
    
    // Update carousel images based on selected style and weather data
    updateCarouselImages(selectedStyle.textContent, weatherData);
    
    // Show popup
    togglePopup('ootd-popup');
    
    // Save selected style to localStorage to persist the selection
    localStorage.setItem('selectedStyle', selectedStyle.textContent);
}

// Update carousel images based on selected style and weather data
function updateCarouselImages(selectedStyle, weatherData) {
    // Get carousel containers
    const carousel = document.getElementById('ootd-carousel');
    const carouselInner = carousel.querySelector('.carousel-inner');
    const carouselIndicators = carousel.querySelector('.carousel-indicators');
    
    // Clear existing content
    carouselInner.innerHTML = '';
    carouselIndicators.innerHTML = '';
    
    // Determine if it's cold based on temperature
    const isCold = weatherData.temperature <= 15;
    
    // Array to store image URLs based on style
    let images = [];
    
    // Select images based on chosen style
    switch(selectedStyle) {
        case '运动休闲风':
            if (isCold) {
                images = [
                    'https://images.unsplash.com/photo-1552831388-6a0b3575b32a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fHNwb3J0eSUyMGZhc2hpb24lMjBtZW58ZW58MHx8MHx8fDA%3D',
                    'https://images.unsplash.com/photo-1626818590338-9e21c5a3a40c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNwb3J0eSUyMGZhc2hpb24lMjBtZW58ZW58MHx8MHx8fDA%3D',
                    'https://images.unsplash.com/photo-1536766768598-e09213fdcf22?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fHNwb3J0eSUyMGZhc2hpb24lMjBtZW58ZW58MHx8MHx8fDA%3D'
                ];
            } else {
                images = [
                    'https://images.unsplash.com/photo-1598346762291-aee88549193f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3BvcnR5JTIwZmFzaGlvbiUyMG1lbnxlbnwwfHwwfHx8MA%3D%3D',
                    'https://images.unsplash.com/photo-1562183241-b937e95585b6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNwb3J0eSUyMGZhc2hpb258ZW58MHx8MHx8fDA%3D',
                    'https://images.unsplash.com/photo-1507398941261-aea25961be1b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3BvcnQlMjBmYXNoaW9ufGVufDB8fDB8fHww'
                ];
            }
            break;
        case '商务精英风':
            if (isCold) {
                images = [
                    'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGJ1c2luZXNzJTIwZmFzaGlvbiUyMG1lbnxlbnwwfHwwfHx8MA%3D%3D',
                    'https://images.unsplash.com/photo-1579391350812-bf8acc6d8897?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTM1fHxidXNpbmVzcyUyMGZhc2hpb24lMjBtZW58ZW58MHx8MHx8fDA%3D',
                    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGJ1c2luZXNzJTIwZmFzaGlvbiUyMG1lbnxlbnwwfHwwfHx8MA%3D%3D'
                ];
            } else {
                images = [
                    'https://images.unsplash.com/photo-1588872957619-4c9bf8ebf3a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTd8fGJ1c2luZXNzJTIwZmFzaGlvbiUyMG1lbnxlbnwwfHwwfHx8MA%3D%3D',
                    'https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fGJ1c2luZXNzJTIwZmFzaGlvbiUyMG1lbnxlbnwwfHwwfHx8MA%3D%3D',
                    'https://images.unsplash.com/photo-1577412647305-991150c7d163?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGJ1c2luZXNzJTIwZmFzaGlvbiUyMG1lbnxlbnwwfHwwfHx8MA%3D%3D'
                ];
            }
            break;
        case '日系潮流风':
            if (isCold) {
                images = [
                    'https://images.unsplash.com/photo-1536766768598-e09213fdcf22?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fGphcGFuZXNlJTIwZmFzaGlvbiUyMG1lbnxlbnwwfHwwfHx8MA%3D%3D',
                    'https://images.unsplash.com/photo-1517298257259-f72ccd2db392?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGphcGFuZXNlJTIwZmFzaGlvbiUyMG1lbnxlbnwwfHwwfHx8MA%3D%3D',
                    'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGphcGFuZXNlJTIwc3RyZWV0JTIwZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D'
                ];
            } else {
                images = [
                    'https://images.unsplash.com/photo-1497551060073-4c5ab6435f12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amFwYW5lc2UlMjBmYXNoaW9ufGVufDB8fDB8fHww',
                    'https://images.unsplash.com/photo-1542931287-023b922fa89b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8amFwYW5lc2UlMjBzdHJlZXQlMjBmYXNoaW9ufGVufDB8fDB8fHww',
                    'https://images.unsplash.com/photo-1523380744952-b7e00e6e2ffa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8amFwYW5lc2UlMjBzdHJlZXQlMjBmYXNoaW9ufGVufDB8fDB8fHww'
                ];
            }
            break;
        case '韩系简约风':
            if (isCold) {
                images = [
                    'https://images.unsplash.com/photo-1611485988300-b7ef6c1766d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzN8fGtvcmVhbiUyMGZhc2hpb24lMjBtZW58ZW58MHx8MHx8fDA%3D',
                    'https://images.unsplash.com/photo-1622495894528-93483ad77c99?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTZ8fGtvcmVhbiUyMGZhc2hpb24lMjBtZW58ZW58MHx8MHx8fDA%3D',
                    'https://images.unsplash.com/photo-1550246140-5119ae4790b8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTh8fGtvcmVhbiUyMGZhc2hpb24lMjBtZW58ZW58MHx8MHx8fDA%3D'
                ];
            } else {
                images = [
                    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGtvcmVhbiUyMGZhc2hpb258ZW58MHx8MHx8fDA%3D',
                    'https://images.unsplash.com/photo-1485373650252-ee1e5f2c32e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8a29yZWFuJTIwZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D',
                    'https://images.unsplash.com/photo-1517094629229-f8a6439f8946?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fGtvcmVhbiUyMGZhc2hpb258ZW58MHx8MHx8fDA%3D'
                ];
            }
            break;
        case '学院风':
            if (isCold) {
                images = [
                    'https://images.unsplash.com/photo-1596609548086-85bbf8ddb6b9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJlcHB5JTIwZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D',
                    'https://images.unsplash.com/photo-1620626711800-836fcc9d9abe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHByZXBweSUyMGZhc2hpb258ZW58MHx8MHx8fDA%3D',
                    'https://images.unsplash.com/photo-1571445556382-45b965d25cd7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fHByZXBweSUyMGZhc2hpb258ZW58MHx8MHx8fDA%3D'
                ];
            } else {
                images = [
                    'https://images.unsplash.com/photo-1595341595407-a11b5eeefbc5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fHByZXBweSUyMGZhc2hpb258ZW58MHx8MHx8fDA%3D',
                    'https://images.unsplash.com/flagged/photo-1571367034861-e6729ad9d562?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJlcHB5JTIwZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D',
                    'https://images.unsplash.com/photo-1617619395795-cf0d9acdefcf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNvbGxlZ2UlMjBmYXNoaW9ufGVufDB8fDB8fHww'
                ];
            }
            break;
        case '复古文艺风':
            if (isCold) {
                images = [
                    'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmludGFnZSUyMGZhc2hpb258ZW58MHx8MHx8fDA%3D',
                    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHZpbnRhZ2UlMjBmYXNoaW9ufGVufDB8fDB8fHww',
                    'https://images.unsplash.com/photo-1503341338985-c0477be52513?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fHZpbnRhZ2UlMjBmYXNoaW9ufGVufDB8fDB8fHww'
                ];
            } else {
                images = [
                    'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHZpbnRhZ2UlMjBmYXNoaW9ufGVufDB8fDB8fHww',
                    'https://images.unsplash.com/photo-1520263115673-610416f52ab6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fHZpbnRhZ2UlMjBmYXNoaW9ufGVufDB8fDB8fHww',
                    'https://images.unsplash.com/photo-1603049489988-53ebcf764bba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTkwfHx2aW50YWdlJTIwZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D'
                ];
            }
            break;
        default:
            // Default images if style not recognized
            images = [
                'https://images.unsplash.com/photo-1583744946564-b52d01e7f922?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZhc2hpb24lMjBtb2RlbHxlbnwwfHwwfHx8MA%3D%3D',
                'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzaGlvbiUyMHN0eWxlfGVufDB8fDB8fHww',
                'https://images.unsplash.com/photo-1550246140-5119ae4790b8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3R5bGV8ZW58MHx8MHx8fDA%3D'
            ];
    }
    
    // Create carousel items and indicators
    images.forEach((image, index) => {
        // Create carousel item
        const carouselItem = document.createElement('div');
        carouselItem.className = 'carousel-item fixed-carousel-item';
        if (index === 0) {
            carouselItem.classList.add('active');
        }
        
        // Create and append image
        const img = document.createElement('img');
        img.src = image;
        img.alt = `${selectedStyle}穿搭示例${index + 1}`;
        carouselItem.appendChild(img);
        
        // Append item to carousel
        carouselInner.appendChild(carouselItem);
        
        // Create carousel indicator
        const indicator = document.createElement('div');
        indicator.className = 'carousel-indicator';
        if (index === 0) {
            indicator.classList.add('active');
        }
        carouselIndicators.appendChild(indicator);
    });
    
    // Initialize the carousel
    initCarousel('ootd-carousel');
}

// Check if user profile is completed
function checkUserProfile() {
    const { city, gender, description } = loadUserProfile();
    
    // If any profile data is missing, redirect to onboarding
    if (!city || !gender || !description) {
        window.location.href = 'onboarding.html';
    }
}

// Get formatted date
function getFormattedDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    
    const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
    const weekDay = weekDays[now.getDay()];
    
    return `${year}年${month}月${date}日 星期${weekDay}`;
}

// Update weather data based on user's city
function updateWeatherData() {
    const userProfile = loadUserProfile();
    
    // Update city display
    const cityElement = document.getElementById('city-name');
    if (cityElement && userProfile.city) {
        cityElement.textContent = userProfile.city;
    }
    
    // Format and display the current date
    const dateElement = document.querySelector('.weather-card p.text-sm, .text-sm.text-gray-500');
    if (dateElement) {
        dateElement.textContent = getFormattedDate();
    }
    
    // Mock weather data for different cities
    const weatherData = {
        '北京': { temp: 16, minTemp: 11, maxTemp: 19, humidity: 65, windSpeed: 3.5, rainChance: 20, condition: 'cloudy' },
        '上海': { temp: 26, minTemp: 18, maxTemp: 26, humidity: 60, windSpeed: 4.2, rainChance: 30, condition: 'partly-cloudy' },
        '广州': { temp: 28, minTemp: 20, maxTemp: 28, humidity: 75, windSpeed: 2.8, rainChance: 45, condition: 'rainy' },
        '深圳': { temp: 27, minTemp: 19, maxTemp: 27, humidity: 72, windSpeed: 3.0, rainChance: 40, condition: 'cloudy' },
        'SS': { temp: 22, minTemp: 12, maxTemp: 22, humidity: 40, windSpeed: 3.2, rainChance: 15, condition: 'partly-cloudy' }
    };
    
    // Get weather data for user's city
    const cityWeather = weatherData[userProfile.city] || weatherData['北京'];
    
    // Update weather display
    const tempElement = document.querySelector('.temperature');
    if (tempElement) {
        tempElement.textContent = cityWeather.temp;
    }
    
    // Update temperature range
    const tempRangeElement = document.getElementById('temp-range');
    if (tempRangeElement) {
        tempRangeElement.textContent = `${cityWeather.minTemp}° / ${cityWeather.maxTemp}°`;
    }
    
    // Update weather condition
    const weatherConditionElement = document.getElementById('weather-condition');
    if (weatherConditionElement) {
        let conditionText = '晴朗';
        
        if (cityWeather.condition === 'rainy' || cityWeather.rainChance >= 40) {
            conditionText = '小雨';
        } else if (cityWeather.condition === 'cloudy' || (cityWeather.rainChance >= 25 && cityWeather.rainChance < 40)) {
            conditionText = '阴天';
        } else if (cityWeather.condition === 'partly-cloudy' || (cityWeather.rainChance >= 10 && cityWeather.rainChance < 25)) {
            conditionText = '多云';
        }
        
        weatherConditionElement.innerHTML = `${conditionText} · 湿度 <span class="humidity-value">${cityWeather.humidity}</span>%`;
    }
    
    // Update weather icon based on condition
    const weatherIconElement = document.getElementById('weather-icon');
    if (weatherIconElement) {
        let iconClass = 'fas fa-sun'; // Default sunny icon
        
        // Determine icon based on condition or rain chance
        if (cityWeather.condition === 'rainy' || cityWeather.rainChance >= 40) {
            iconClass = 'fas fa-cloud-rain';
        } else if (cityWeather.condition === 'cloudy' || (cityWeather.rainChance >= 25 && cityWeather.rainChance < 40)) {
            iconClass = 'fas fa-cloud';
        } else if (cityWeather.condition === 'partly-cloudy' || (cityWeather.rainChance >= 10 && cityWeather.rainChance < 25)) {
            iconClass = 'fas fa-cloud-sun';
        }
        
        // Update the icon class
        weatherIconElement.className = iconClass;
    }
    
    // Update humidity, wind speed and rain chance if elements exist
    const humidityElements = document.querySelectorAll('.humidity-value');
    humidityElements.forEach(element => {
        element.textContent = cityWeather.humidity;
    });
    
    const windElement = document.querySelector('.wind-value');
    if (windElement) {
        windElement.textContent = cityWeather.windSpeed + ' m/s';
    }
    
    const rainElement = document.querySelector('.rain-value');
    if (rainElement) {
        rainElement.textContent = cityWeather.rainChance + '%';
    }
}

// Populate style options based on user gender
function populateStyleOptions() {
    const userProfile = loadUserProfile();
    const styleOptions = document.getElementById('style-options');
    
    if (!styleOptions) return;
    
    // Clear existing options
    styleOptions.innerHTML = '';
    
    // Define styles based on gender
    let styles = [];
    if (userProfile.gender === 'male') {
        styles = ['运动休闲风', '商务精英风', '日系潮流风', '韩系简约风', '学院风', '街头嘻哈风', '户外机能风', '复古文艺风', '极简主义风', '工装风'];
    } else {
        styles = ['甜酷风', '温柔风', '学院风', '韩系简约风', '设计师品牌风', '复古文艺风', '小香风', '森系风', '运动休闲风', 'Y2K风'];
    }
    
    // Create style options
    styles.forEach(style => {
        const option = document.createElement('div');
        option.className = 'style-option';
        option.textContent = style;
        option.setAttribute('data-group', 'style');
        option.onclick = function() { selectStyle(this, 'style'); };
        styleOptions.appendChild(option);
    });
}

// Update 7-day forecast with dynamic weather icons
function updateForecast() {
    // Get current date for creating forecast dates
    const now = new Date();
    
    // Mock 7-day forecast data
    const forecastData = [
        { day: '今天', condition: 'sunny', temp: 25 },
        { day: '周二', condition: 'sunny', temp: 22 },
        { day: '周三', condition: 'partly-cloudy', temp: 19 },
        { day: '周四', condition: 'rainy', temp: 18 },
        { day: '周五', condition: 'partly-cloudy', temp: 20 },
        { day: '周六', condition: 'sunny', temp: 23 },
        { day: '周日', condition: 'sunny', temp: 24 }
    ];
    
    // Add dates to each forecast item
    forecastData.forEach((item, index) => {
        const forecastDate = new Date(now);
        forecastDate.setDate(now.getDate() + index);
        const date = forecastDate.getDate(); // Get day of month
        
        // For today, keep it as just "今天"
        if (index > 0) {
            item.day = `${item.day} ${date}日`;
        }
    });
    
    // Get all forecast item elements
    const forecastItems = document.querySelectorAll('.forecast-item');
    
    // Update each forecast item with the corresponding data
    forecastItems.forEach((item, index) => {
        if (index < forecastData.length) {
            const dayElement = item.querySelector('.forecast-day');
            const iconElement = item.querySelector('.forecast-details i');
            const tempElement = item.querySelector('.forecast-temp');
            
            // Update day text
            if (dayElement) {
                dayElement.textContent = forecastData[index].day;
            }
            
            // Update temperature
            if (tempElement) {
                tempElement.textContent = forecastData[index].temp + '°C';
            }
            
            // Update icon based on condition
            if (iconElement) {
                let iconClass = 'fas fa-sun text-yellow-400';
                
                switch (forecastData[index].condition) {
                    case 'rainy':
                        iconClass = 'fas fa-cloud-rain text-blue-400';
                        break;
                    case 'cloudy':
                        iconClass = 'fas fa-cloud text-gray-400';
                        break;
                    case 'partly-cloudy':
                        iconClass = 'fas fa-cloud-sun text-gray-400';
                        break;
                    case 'snowy':
                        iconClass = 'fas fa-snowflake text-blue-200';
                        break;
                    case 'stormy':
                        iconClass = 'fas fa-bolt text-yellow-500';
                        break;
                }
                
                iconElement.className = iconClass;
            }
        }
    });
}

// Initialize weather demo card on onboarding page
function initWeatherDemoCard() {
    const weatherDemoCard = document.querySelector('.weather-demo-card');
    if (!weatherDemoCard) return;
    
    // Format current date in Chinese
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    
    const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
    const weekDay = weekDays[now.getDay()];
    
    // Format date like "2023年11月15日 星期三"
    const formattedDate = `${year}年${month}月${day}日 星期${weekDay}`;
    
    // Update date in card
    const dateElement = weatherDemoCard.querySelector('p.text-sm');
    if (dateElement) {
        dateElement.textContent = formattedDate;
    }
    
    // Simulate different weather conditions based on the day of month
    let weatherCondition, minTemp, maxTemp, currentTemp, humidity;
    const dayNum = day % 4; // Use modulo to create variety
    
    switch(dayNum) {
        case 0:
            weatherCondition = '晴朗';
            minTemp = 12;
            maxTemp = 22;
            currentTemp = 18;
            humidity = 45;
            break;
        case 1:
            weatherCondition = '多云';
            minTemp = 10;
            maxTemp = 18;
            currentTemp = 15;
            humidity = 60;
            break;
        case 2:
            weatherCondition = '小雨';
            minTemp = 8;
            maxTemp = 15;
            currentTemp = 12;
            humidity = 75;
            break;
        case 3:
            weatherCondition = '阴天';
            minTemp = 11;
            maxTemp = 19;
            currentTemp = 16;
            humidity = 65;
            break;
    }
    
    // Update temperature range
    const tempRangeElement = weatherDemoCard.querySelector('.temp-range');
    if (tempRangeElement) {
        tempRangeElement.textContent = `${minTemp}° / ${maxTemp}°`;
    }
    
    // Update main temperature
    const mainTempElement = weatherDemoCard.querySelector('.main-temp');
    if (mainTempElement) {
        mainTempElement.textContent = `${currentTemp}°`;
    }
    
    // Update weather condition
    const conditionElement = weatherDemoCard.querySelector('.weather-condition');
    if (conditionElement) {
        conditionElement.textContent = `${weatherCondition} · 湿度 ${humidity}%`;
    }
    
    // Update weather icon
    const iconElement = weatherDemoCard.querySelector('.weather-icon i');
    if (iconElement) {
        switch(weatherCondition) {
            case '晴朗':
                iconElement.className = 'fas fa-sun';
                break;
            case '多云':
                iconElement.className = 'fas fa-cloud-sun';
                break;
            case '小雨':
                iconElement.className = 'fas fa-cloud-rain';
                break;
            case '阴天':
                iconElement.className = 'fas fa-cloud';
                break;
        }
    }
}

// Function to get current weather data for the user's location
function getCurrentWeather() {
    // Get user profile to determine city
    const userProfile = loadUserProfile();
    const city = userProfile.city || '北京';
    
    // Mock weather data for different cities
    const weatherData = {
        '北京': { temperature: 16, minTemp: 11, maxTemp: 19, humidity: 65, windSpeed: 3.5, rainChance: 20, condition: 'cloudy', city: '北京' },
        '上海': { temperature: 26, minTemp: 18, maxTemp: 26, humidity: 60, windSpeed: 4.2, rainChance: 30, condition: 'partly-cloudy', city: '上海' },
        '广州': { temperature: 28, minTemp: 20, maxTemp: 28, humidity: 75, windSpeed: 2.8, rainChance: 45, condition: 'rainy', city: '广州' },
        '深圳': { temperature: 27, minTemp: 19, maxTemp: 27, humidity: 72, windSpeed: 3.0, rainChance: 40, condition: 'cloudy', city: '深圳' }
    };
    
    // Return weather for user's city or default to Beijing
    return weatherData[city] || weatherData['北京'];
}

// Function to update weather icon based on condition
function updateWeatherIcon(iconElement, condition) {
    if (!iconElement) return;
    
    let iconClass = 'fas fa-sun'; // Default sunny icon
    
    // Determine icon based on condition
    switch(condition) {
        case 'rainy':
            iconClass = 'fas fa-cloud-rain text-blue-400';
            break;
        case 'cloudy':
            iconClass = 'fas fa-cloud text-gray-500';
            break;
        case 'partly-cloudy':
            iconClass = 'fas fa-cloud-sun text-gray-400';
            break;
        default:
            iconClass = 'fas fa-sun text-yellow-400';
    }
    
    // Update the icon class
    iconElement.className = iconClass;
}

// Function to format recommendation text based on weather and style
function formatRecommendation(weatherData, style) {
    let recommendation = '';
    
    // Add weather context first
    recommendation += `今天${weatherData.city}天气${getWeatherConditionText(weatherData.condition)}，温度在${weatherData.minTemp}-${weatherData.maxTemp}°C之间，`;
    
    // Add clothing recommendation based on temperature
    if (weatherData.temperature <= 15) {
        recommendation += '建议穿着轻薄外套搭配长裤。';
    } else if (weatherData.temperature >= 25) {
        recommendation += '建议穿着轻薄透气的短袖短裤。';
    } else {
        recommendation += '建议穿着舒适的单层衣物。';
    }
    
    // Add specific style recommendation
    switch(style) {
        case '运动休闲风':
            recommendation += style + '可以选择oversized卫衣配高腰牛仔裤，脚踩厚底运动鞋，搭配棒球帽和斜挎包，既保暖又时尚。';
            break;
        case '商务精英风':
            recommendation += style + '可以选择合身衬衫配修身西裤，搭配一件质感西装，皮鞋擦亮，简约手表点缀，尽显精英气质。';
            break;
        case '日系潮流风':
            recommendation += style + '可以选择oversized卫衣配宽松工装裤，叠穿衬衫增加层次感，搭配帆布鞋和棒球帽，打造日系街头感。';
            break;
        case '韩系简约风':
            recommendation += style + '可以选择纯色系T恤配高腰直筒牛仔裤，外搭简约风衣，小白鞋增添清爽感，简约不失时尚。';
            break;
        case '学院风':
            recommendation += style + '可以选择条纹衬衫配格纹百褶裙/裤，搭配针织背心，复古小皮鞋和长袜，俏皮又有学院气息。';
            break;
        case '甜酷风':
            recommendation += style + '可以选择oversized卫衣配高腰牛仔裤，脚踩厚底运动鞋，搭配棒球帽和链条包，既保暖又时尚。';
            break;
        default:
            recommendation += style + '风格建议选择符合个人气质的单品，注重整体搭配的和谐与平衡。';
    }
    
    return recommendation;
}

// Helper function to convert weather condition to Chinese text
function getWeatherConditionText(condition) {
    switch(condition) {
        case 'sunny':
            return '晴朗';
        case 'cloudy':
            return '阴天';
        case 'partly-cloudy':
            return '多云';
        case 'rainy':
            return '有雨';
        default:
            return '晴朗';
    }
} 