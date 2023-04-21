echo "Building app..."
npm run build

echo "Deploying files to server..."
sshpass -p "asaD12#a" scp -r build/* root@167.71.236.11:/var/www/gipermart-frontend/

echo "Deleting build files..."
rm -rf build

#sshpass -p "asad_Pass\!@#4" ssh root@64.225.106.74
