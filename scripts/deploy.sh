#!/bin/sh
echo "** Starting new deploy **"
echo ""
echo "Current directory:"
echo ">>> $(pwd)"

remote=$(git config remote.origin.url)

echo ""
echo "Getting remote:"
echo ">>> ${remote}"
echo ""

appdir="$1"

echo "Configuring application directory:"
echo ">>> ${appdir}"

if [ ! -d "$appdir" ]; then
    echo ">>> ERROR: ${appdir} doesn't exist, please provide a valid directory"
    echo ">>> USAGE: $0 <site source dir>"
    exit 1
fi

depdir="gh-pages-branch"

echo ""
echo "Configuring test environment"
echo ">>> Creating gh-pages' directory"
mkdir ${depdir}

echo ">>> entering into gh-pages' directory"
cd ${depdir}

echo "Configuring GitHub Account"
git config --global user.email "$GH_EMAIL" > /dev/null 2>&1
git config --global user.name "$GH_NAME" > /dev/null 2>&1
for line in $(git config --list | grep user); do
    echo ">>> $line";
done

echo "Configuring GitHub Remote"
git init
git remote add --fetch origin "$remote"
echo ">>> remote $(git config remote.origin.url)"

echo "Looking for old gh-pages files"
git rev-parse --verify origin/gh-pages > /dev/null 2>&1

if $?; then
    echo ">>> Entering to an ophan gh-pages branch"
    git checkout --orphan gh-pages
else
    echo ">>> Deleting old gh-pages content"
    git checkout gh-pages
    git rm -rf .
fi

# -*- BEGIN -*-
# El procesamiento de contenido que tengas que revisar empieza aquí
echo "Getting new gh-pages content from ${appdir}"
cp -a "../${appdir}/*" .
echo ">>> Transfer complete"
# -*- END -*-

echo "Pushing new files to ${remote}"
git add -A
echo ">>> Stage complete"

git commit --allow-empty -m "Deploy to GitHub pages [ci skip]"
echo ">>> Commit complete"

git push --force --quiet origin gh-pages > /dev/null 2>&1
echo ">>> Push complete"

echo "Removing unnecesary files"
cd ..
rm -rf gh-pages-branch
echo ">>> Remove complete"

echo "** Finished Deployment! **"
