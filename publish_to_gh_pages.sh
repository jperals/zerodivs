#!/bin/sh

if [[ $(git status -s) ]]
then
    echo "The working directory is dirty. Please commit any pending changes."
    exit 1;
fi

echo "Deleting old publication"
rm -rf dist
mkdir dist
git worktree prune
rm -rf .git/worktrees/dist/

echo "Removing existing files"
rm -rf dist/*

echo "Generating site"
npm run build

echo "Checking out gh-pages branch into dist"
git worktree add -B gh-pages dist github/gh-pages

echo "Updating gh-pages branch"
cd dist && git add --all && git commit -m "New build"

echo "Publishing to Github pages"
git push && cd ..
