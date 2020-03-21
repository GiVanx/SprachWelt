db.createUser(
{
	user: "givanx",
	pwd: "root",
	roles: [
	{
		role: "readWrite",
		db: "sprach-welt"
	}
	]
}
)