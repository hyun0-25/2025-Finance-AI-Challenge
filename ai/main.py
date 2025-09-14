import argparse
from task1_ai_checklist import run_task1
from task2_card_recommend import run_task2
from task3_notification import run_task3

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--task", type=int, required=True, help="1=체크리스트, 2=카드추천, 3=알림")
    args = parser.parse_args()

    if args.task == 1:
        run_task1()
    elif args.task == 2:
        user_id = b'\x89\xdb\xf5>\xc7EE\xe0\x88\x07;\x11#-\xbb\xb9'
        run_task2(schedule_id=4, user_id=user_id)
    elif args.task == 3:
        run_task3(schedule_id=4)
