export default {
required: (value) => !!value || "This is Required.",
phone:(value) => {
  if (value.length == 10) return true;
  else if(/.+@.+\..+/.test(value)) return true;
     return "Enter Valid number or email"
}
}
  
