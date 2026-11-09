document.addEventListener('DOMContentLoaded', function () {

    /* ---------- toast helper ---------- */
    var toast = document.getElementById('ctToast');
    function showToast(msg) {
        toast.textContent = msg;
        toast.classList.add('show');
        clearTimeout(showToast._t);
        showToast._t = setTimeout(function () {
            toast.classList.remove('show');
        }, 2400);
    }

    /* ---------- copy to clipboard (whatsapp / email cards) ---------- */
    document.querySelectorAll('.ct-copy').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var value = btn.getAttribute('data-copy');
            navigator.clipboard.writeText(value).then(function () {
                showToast('Copied "' + value + '" to clipboard');
            }).catch(function () {
                showToast('Could not copy — please copy manually');
            });
        });
    });

    /* ---------- accordion ---------- */
    document.querySelectorAll('.ct-acc-item button').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var item = btn.closest('.ct-acc-item');
            var wasOpen = item.classList.contains('open');
            document.querySelectorAll('.ct-acc-item').forEach(function (i) {
                i.classList.remove('open');
            });
            if (!wasOpen) item.classList.add('open');
        });
    });

    /* ---------- live price estimate ---------- */
    var priceMap = {
        csd: 'R350 – R500',
        sbd: 'R250 per form (5 forms for R1000)',
        tax: 'R200',
        packing: 'R300 – R600',
        bundle: 'R1500 – R3000',
        other: "We'll confirm your exact price in the free consultation"
    };

    var serviceSelect = document.getElementById('service');
    var estimateBox = document.getElementById('ctEstimate');
    var estimateValue = document.getElementById('ctEstimateValue');

    serviceSelect.addEventListener('change', function () {
        var val = serviceSelect.value;
        if (val && priceMap[val]) {
            estimateValue.textContent = priceMap[val];
            estimateBox.classList.add('show');
        } else {
            estimateBox.classList.remove('show');
        }
    });

    /* ---------- form validation ---------- */
    var form = document.getElementById('ctForm');
    var messageInput = document.getElementById('message');
    var countEl = document.getElementById('ctCount');

    messageInput.addEventListener('input', function () {
        countEl.textContent = messageInput.value.length + ' / 500';
    });

    function validateField(field) {
        var wrapper = field.closest('.ct-field');
        var valid = field.checkValidity();
        wrapper.classList.toggle('invalid', !valid);
        return valid;
    }

    form.querySelectorAll('input, textarea').forEach(function (field) {
        field.addEventListener('blur', function () { validateField(field); });
        field.addEventListener('input', function () {
            if (field.closest('.ct-field').classList.contains('invalid')) {
                validateField(field);
            }
        });
    });

    form.addEventListener('submit', function (e) {
        var allValid = true;
        form.querySelectorAll('input[required], textarea[required]').forEach(function (field) {
            if (!validateField(field)) allValid = false;
        });

        if (!allValid) {
            e.preventDefault();
            showToast('Please fill in the highlighted fields');
            return;
        }

        e.preventDefault();
        var g = function (id) { return document.getElementById(id); };
        var svc = g('service');
        var svcText = svc.value ? svc.options[svc.selectedIndex].text : 'Not specified';
        var body = 'Name: ' + g('name').value + '\nPhone: ' + g('phone').value +
            '\nEmail: ' + g('email').value + '\nService: ' + svcText +
            '\n\nMessage:\n' + g('message').value;
        window.location.href = 'mailto:amtenderadmin@gmail.com?subject=' +
            encodeURIComponent('Tender enquiry from ' + g('name').value) +
            '&body=' + encodeURIComponent(body);

        var submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Opening your email app…';
        showToast('Opening your email client to send this enquiry');

        setTimeout(function () {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Enquiry';
        }, 2500);
    });

});