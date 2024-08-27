import { Link } from "@/navigation";

export default function Footer() {
  return (
    <footer className="bg-[#FBFBFB] py-6 md:pt-12">
      <div className="custom-container space-y-6 md:flex md:justify-between">
        <div className="md:w-2/4">
          <img src="/assets/logo.svg" className="w-[200px] mb-3" alt="" />
          <p className="text-gray-600 text-sm md:text-base leading-relaxed md:leading-loose">
            When you owned home, you're comitting to living in one location for
            a while. In a recent Trulia survey, we found that five out of six
            respondents said finding the right neighbourhood
          </p>
        </div>
        <div className="space-y-2 md:space-y-4">
          <p className="font-bold md:text-lg">Menu</p>
          <ul className="space-y-3 text-gray-600 text-sm md:text-base">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/listings">Listings</Link>
            </li>
            <li>
              <Link href="/agents">Agents</Link>
            </li>
            <li>
              <Link href="/my-favorites">My Favorites</Link>
            </li>
          </ul>
        </div>
        <div className="space-y-2 md:space-y-4">
          <p className="font-bold md:text-lg">Contact Us</p>
          <ul className="space-y-1 md:space-y-3 text-gray-600 text-sm md:text-base">
            <li>
              <a href="#" className="flex items-start gap-1">
                <svg
                  className="inline mr-2"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 14C14.206 14 16 12.206 16 10C16 7.794 14.206 6 12 6C9.794 6 8 7.794 8 10C8 12.206 9.794 14 12 14ZM12 8C13.103 8 14 8.897 14 10C14 11.103 13.103 12 12 12C10.897 12 10 11.103 10 10C10 8.897 10.897 8 12 8Z"
                    fill="#1A80E6"
                  />
                  <path
                    d="M11.4201 21.814C11.5893 21.9349 11.7921 21.9998 12.0001 21.9998C12.2081 21.9998 12.4108 21.9349 12.5801 21.814C12.8841 21.599 20.0291 16.44 20.0001 10C20.0001 5.589 16.4111 2 12.0001 2C7.58909 2 4.00009 5.589 4.00009 9.995C3.97109 16.44 11.1161 21.599 11.4201 21.814ZM12.0001 4C15.3091 4 18.0001 6.691 18.0001 10.005C18.0211 14.443 13.6121 18.428 12.0001 19.735C10.3891 18.427 5.97909 14.441 6.00009 10C6.00009 6.691 8.69109 4 12.0001 4Z"
                    fill="#1A80E6"
                  />
                </svg>
                2118 Thornridge Cir. Syracuse, Connecticut 35624
              </a>
            </li>
            <li>
              <a href="#" className="flex items-start gap-1">
                <svg
                  className="inline mr-2"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z"
                    fill="#1A80E6"
                  />
                </svg>
                pros_property@test.dev
              </a>
            </li>
            <li>
              <a href="#" className="flex items-start gap-1">
                <svg
                  className="inline mr-2"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.0498 4.91C18.133 3.98393 17.041 3.24967 15.8374 2.75005C14.6339 2.25043 13.3429 1.99546 12.0398 2C6.5798 2 2.1298 6.45 2.1298 11.91C2.1298 13.66 2.5898 15.36 3.4498 16.86L2.0498 22L7.2998 20.62C8.7498 21.41 10.3798 21.83 12.0398 21.83C17.4998 21.83 21.9498 17.38 21.9498 11.92C21.9498 9.27 20.9198 6.78 19.0498 4.91ZM12.0398 20.15C10.5598 20.15 9.1098 19.75 7.8398 19L7.5398 18.82L4.4198 19.64L5.2498 16.6L5.0498 16.29C4.22755 14.977 3.79094 13.4592 3.7898 11.91C3.7898 7.37 7.4898 3.67 12.0298 3.67C14.2298 3.67 16.2998 4.53 17.8498 6.09C18.6173 6.85396 19.2255 7.76266 19.6392 8.76343C20.0529 9.76419 20.2638 10.8371 20.2598 11.92C20.2798 16.46 16.5798 20.15 12.0398 20.15ZM16.5598 13.99C16.3098 13.87 15.0898 13.27 14.8698 13.18C14.6398 13.1 14.4798 13.06 14.3098 13.3C14.1398 13.55 13.6698 14.11 13.5298 14.27C13.3898 14.44 13.2398 14.46 12.9898 14.33C12.7398 14.21 11.9398 13.94 10.9998 13.1C10.2598 12.44 9.7698 11.63 9.6198 11.38C9.4798 11.13 9.5998 11 9.7298 10.87C9.8398 10.76 9.9798 10.58 10.0998 10.44C10.2198 10.3 10.2698 10.19 10.3498 10.03C10.4298 9.86 10.3898 9.72 10.3298 9.6C10.2698 9.48 9.7698 8.26 9.5698 7.76C9.3698 7.28 9.1598 7.34 9.0098 7.33H8.5298C8.3598 7.33 8.0998 7.39 7.8698 7.64C7.6498 7.89 7.0098 8.49 7.0098 9.71C7.0098 10.93 7.89981 12.11 8.0198 12.27C8.1398 12.44 9.7698 14.94 12.2498 16.01C12.8398 16.27 13.2998 16.42 13.6598 16.53C14.2498 16.72 14.7898 16.69 15.2198 16.63C15.6998 16.56 16.6898 16.03 16.8898 15.45C17.0998 14.87 17.0998 14.38 17.0298 14.27C16.9598 14.16 16.8098 14.11 16.5598 13.99Z"
                    fill="#1A80E6"
                  />
                </svg>
                +6284523423431
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="py-2 md:py-4 text-center mt-12">
        <p>© 2023 Dream Homes Realty. All rights reserved.</p>
      </div>
    </footer>
  );
}
