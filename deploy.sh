echo "Building app..."
npm run build

echo "Deploying files to server..."
sshpass -p "asad_Pass!@#4" scp -r build/* root@64.225.106.74:/var/www/Gipermart-frontend/

echo "Deleting build files..."
rm -rf build

#sshpass -p "asad_Pass\!@#4" ssh root@64.225.106.74
