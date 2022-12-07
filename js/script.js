const nx = new Nx();

(async function main(){
	await nx.init();
	const dataPrompt = document.getElementById("data-prompt");
	const birthdayCard = document.getElementById("birthday-card");
	const beforeBirthday = document.getElementById("before-birthday")
	const afterBirthday = document.getElementById("after-birthday")

	const url = new URL(window.location.href);

	if(url.searchParams.has("name") && url.searchParams.has("deadline")) 
	{
		const name = url.searchParams.get("name");
		const deadline = new Date(url.searchParams.get("deadline"));
		const today = new Date(Date.now());
		if( (deadline - today) > 0 ) {
			beforeBirthday.hidden = false;
			nx.set("targetName", name);
		} 
		else if (deadline.getDate() == today.getDate() && deadline.getMonth() == today.getMonth() && today.getFullYear() == deadline.getFullYear()) 
		{
			birthdayCard.hidden = false;
			nx.set("targetName", name);
		}
		else 
		{
			afterBirthday.hidden = false;
		}
	}
	else
	{
		dataPrompt.hidden = false;
		const makeCardButton = document.getElementById("make-card");
		makeCardButton.addEventListener("click", ev=>{
			const dateInput = document.getElementById("dob");
			const name = document.getElementById("name");
			console.log(dateInput.valueAsDate);
			console.log(name.value);
			const url = new URL(window.location.href);
			url.search = `?name=${name.value}&deadline=${dateInput.valueAsDate.toDateString()}`;
			console.log(url.toString());
			window.location = url.toString();
		})
	}
})();