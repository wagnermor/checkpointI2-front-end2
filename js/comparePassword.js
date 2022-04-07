function comparePassword() {
  const s1 = document.getElementById('inputPassword').value;
  const s2 = document.getElementById('inputPassword2').value;

  if(s1 != s2) {
    const msg = document.querySelector('#inputPassword ~ span');
    msg.innerText = 'Passwords do not match';
    msg.className.add = "span-error";
  }
}

export default comparePassword;
