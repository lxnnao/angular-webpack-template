BRANCH=master
if [ $# != 0 ]; then
    BRANCH="$1"
fi

git pull && git checkout "${BRANCH}" && git pull && node build --target online && node deploy-git --branch ${BRANCH} --target online