import { useEffect } from "react";

export default function License() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="xs:p-5 flex flex-col font-text text-navbar md:px-[15%] md:py-[10%]">
      <div className="flex flex-col gap-y-5 pb-[30px]">
        <span className="text-[60px] uppercase">License</span>
        <p className="">
          All CSS animations generated with Animista.net are free for personal
          and commercial usage and are licensed under FreeBSD license.
        </p>
      </div>

      <div className="flex flex-col gap-y-5">
        <span className="text-[30px]">FreeBSD License</span>
        <span className="uppercase">Copyright 2017 Ana Travas</span>
        <p className="">
          Redistribution and use in source and binary forms, with or without
          modification, are permitted provided that the following conditions are
          met:
        </p>

        <ul className="flex translate-x-[5%] list-decimal flex-col gap-y-5 py-[30px]">
          <li>
            Redistributions of source code must retain the above copyright
            notice, this list of conditions and the following disclaimer.
          </li>
          <li>
            Redistributions in binary form must reproduce the above copyright
            notice, this list of conditions and the following disclaimer in the
            documentation and/or other materials provided with the distribution.
          </li>
        </ul>

        <p className="text-[15px]">
          THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
          "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
          LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
          A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
          HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
          SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
          LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
          DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
          THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
          (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
          OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
        </p>
      </div>
    </div>
  );
}
