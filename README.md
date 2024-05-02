# mantis-react-js

Web theme with name as 'Mantis'. Its name of insect but we derived it from two popular UI framework, Material-UI and Ant Design (M-Ant-is). It provides best features from each. Follows design principle of AntDesign and uses the Component of Material-UI.


# Commands
#### Local development
$ yarn start

#### Deploy to S3
$ yarn build
$ cd build
$ aws s3 sync ./ s3://dev-eastsidefencing.torrantal.asia --profile eastsidefencing.devops
