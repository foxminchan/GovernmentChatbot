from setuptools import setup

setup(
  name='training',
  version='1.0.0',
  packages=[''],
  url='https://github.com/foxminchan/GovermentChatbot',
  license='MIT',
  author='Xuan Nhan',
  author_email='nguyenxuannhan407@gmail.com',
  description='Smart chatbot for streamlined administrative procedures, powered by advanced language models'
)

if __name__ == '__main__':
    from subprocess import call
    call("pip install -r requirements.txt", shell=True)
