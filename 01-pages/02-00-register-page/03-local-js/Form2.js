function checkOtherOption() {
            var selectBox = document.getElementById('topic');
            var otherWrapper = document.getElementById('other-input-wrapper');
            var otherInput = document.getElementById('other-topic');

            if (selectBox.value === 'other') {
                otherWrapper.style.display = 'block';
                otherInput.required = true;
            } else {
                otherWrapper.style.display = 'none';
                otherInput.required = false;
                otherInput.value = ''; 
            }
        }