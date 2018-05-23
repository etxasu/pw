if [ $# -eq 0 ]
	then
		echo "Enter the branch name"
		exit 1
fi

git reset --hard
git checkout $1

if [ $? -ne 0 ]
	then
		echo "Unable to checkout branch"
		exit 1
fi

git pull
npm i
npm run run
