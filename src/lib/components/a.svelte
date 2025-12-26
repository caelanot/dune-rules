<script>
	let expanded = false
	
	const toggleExpanded =
			() => expanded = !expanded
</script>

<nav class:expanded>
	<button on:click={toggleExpanded}>
		{expanded ? "Close" : "Open"}
	</button>
	
	<ul class="essential">
		<li>🚀 <span>Inbox</span></li>
		<li>⭐️ <span>Starred</span></li>
		<li>🗑 <span>Trashed</span></li>
	</ul>
	
	<section class="non-essential">
		<hr />
		<ul>
			<li><h3>Folders</h3></li>
			<li>🧾 Receipts</li>
			<li>🤖 Autofilter</li>
		</ul>
	</section>
</nav>

<style>
	nav {
		grid-area: nav;
		height: 100vw;
		background-color: #324754;
		color: #A2B7C4;
		transition: ease-out 200ms;
		width: 60px;
		overflow: hidden;
	}

	.expanded {
		transition: ease-out 200ms;
		width: 200px;
	}
	
	ul {
		list-style: none;
		padding: 20px;
		margin: 0;
	}
	
	li {
		width: 200px;
	}
	
	h3 {
		text-transform: uppercase;
		margin: 0;
		padding: 10px 0;
	}
	
	hr {
	  color: white;
		width: 80%;
	}
	
	button {
		border: none;
		background: none;
		color: #A2B7C4;
		text-transform: uppercase;
	}
	
	/** Here's all the fading in and out stuff **/
	
	.essential li > span,
	.non-essential {
		transition: opacity 200ms ease-out, visibility 0ms 200ms;
		opacity: 0;
		visibility: hidden;
	}
	
	.expanded .essential li > span,
	.expanded .non-essential {
		transition: opacity 200ms ease-out 100ms;
		opacity: 1;
		visibility: visible;
	}
</style>